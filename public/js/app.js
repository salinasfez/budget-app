
class Income extends React.Component {
  constructor(props){
    super(props);
  }
  // state = {
  //   income: [],
  //   amount: '',
  //   savings: 0,
  //   name: name
  // };
 
  render() {
    // let totalIncome = this.props.firstIncome.amount + this.props.secondIncome.amount + this.props.thirdIncome.amount;
    let totalIncome = this.props.income.reduce(function(a,b) {return a + b.amount}, 0)
    let totalBillAmount = this.props.bills.reduce(function(a,b) {return a + b.amount}, 0)
    return (
      <div className='row justify-content-center' >
      <form class="form-inline " onSubmit={this.props.handleIncomeSubmit}>
        <div class="form-group mb-2">
          <label htmlFor="amount" className="form-control-plaintext monthly-income">Monthly Income</label>
        </div>

        <div class="form-group mx-sm-3 mb-2">
          <input type="text" class="form-control" id="amount" placeholder="amount" value={this.props.amount} onChange={this.props.handleIncomeChange} />
        </div>
        <button type="submit" class="btn btn-primary mb-2">Submit</button>
      </form>
      <div className='row flex-container' >
        {/* <div className='col border my-3 p-3'> */}
          <div className="container-app border income">
          <table className="table table-striped">
            <thead>
              <h5>Income</h5>
            </thead>
            <tbody>
               {this.props.income.map((amount, index) => {
                 return (
                   <tr>
                         <td key={amount._id}>${amount.amount}</td>
                         <button onClick={() => this.props.deleteIncome(amount._id, index)}>Delete</button>
                         <br></br>
                       </tr>
                    )
                  })}

            </tbody>
          </table>
                  
                 <br></br>
                  

        
                 Total Income: ${totalIncome}
        </div>
        {/* <div className='col border my-3 p-3'> */}
          <div className="container-app border income-left">
          <h5>Income left to budget</h5>
          {/* {this.props.income[0].amount} */}
          {/* {this.props.income.map((amount, index) => {
                    return (
                        <div>
                          {this.props.bills.map((bill, index) => {
                                return (
                                      <div>
                                          ${amount.amount - bill.amount}
                                      </div>
                    )
                })}
                        </div>
                    )
                })} */}
               ${totalIncome - totalBillAmount}
        </div>
      </div>
      </div>
    )
  }
}

class Expenses extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className='col'>

        {/* ***************** 
            add bill section 
        ****************/}

        <div className="border my-3 p-3 add-expense" >
          <form onSubmit={this.props.handleBillSubmit}>
            <div className="form-group">
              <h4 className='text-center'>Add Expense</h4>
              <h6><label>Name</label></h6>
              <input className="form-control" type='text' id="name" placeholder="name" value={this.props.name} onChange={this.props.handleBillChange} /><br />
              <h6><label>Amount</label></h6>
              <input className="form-control" type='text' id="amount" placeholder="amount" value={this.props.amount} onChange={this.props.handleBillChange} />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Submit</button>
          </form>
        </div>
        

        {/* ***************** 
            bill Data display section
        ****************/}

        <div className=' border my-3 p-3 expense-details'>
          <h4 className="text-center">Expense Details</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Paid</th>
                <th scope="col">Delete</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
             
            {this.props.bills.map((item,index) => {
                return (
                    <tr>
                        <td> {item.name} </td>
                        <td>${item.amount}</td>
                        <td>Paid</td>
                        <td><button onClick={() => this.props.deleteBill(item._id, index)}>Delete</button></td>
                        <td><button onClick={() => this.props.handleBillUpdate(item._id, index)}>Edit</button></td>
                        {/* <td><button onClick={() => console.log('testing')}>Edit</button></td> */}

                    </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}
class App extends React.Component {
  state = {
    bills: [],
    income: []
  }
  componentDidMount() {
    fetch('/bills')
        .then(response => response.json())
        .then(bills =>
            this.setState({
                bills: bills
            })
        );
    fetch('/income')
    .then(response => response.json())
    .then(income =>
        this.setState({
            income: income
        })
    );
  }
  handleBillChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }
  handleBillSubmit = (event) => {
    event.preventDefault()
    fetch('/bills', {
        body: JSON.stringify({
            name: this.state.name,
            amount: this.state.amount
        }),
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(createdBills => {
      return createdBills.json();
    })
    // .then( createdBills => console.log(createdBills))
   
    .then(jsonedBills => {
        this.setState({
            name: '',
            amount: '',
            bills: [jsonedBills, ...this.state.bills]
        })
    }).catch(error => console.log(error));
   
}
handleBillUpdate = (id) => {
  
  fetch('bills/' + id, {
      body: JSON.stringify({name: this.state.name,
                            amount: this.state.amount }),
      method: "PUT",
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      }
  })
  .then(updatedBill => console.log(updatedBill))
  .then(updatedBill => updatedBill.json())
  // .then(jMark => {
  //         fetch("http://localhost:3000/bookmarks/")
  //             .then(updatedMark => updatedMark.json())
  //             .then(JupdatedMark => {
  //                 this.setState({
  //                     id: "",
  //                     editing: false,
  //                     sites: JupdatedMark,
  //                     formInputs: {
  //                         site_name:"",
  //                         url: "",
  //                         category: "",
  //                         description: "",
  //                         img: ""
  //                     }
  //                 });
  //             })
  // })
  .catch(err => console.log(err));
}
deleteBill = (id, index) => {
  fetch('bills/' + id, {
      method: "DELETE"
  }).then(data => {
      this.setState({
          bills: [
              ...this.state.bills.slice(0, index),
              ...this.state.bills.slice(index + 1)
          ]
      })
  })
}

handleIncomeChange = (event) => {
  this.setState({ [event.target.id]: event.target.value })
}
handleIncomeSubmit = (event) => {
  event.preventDefault()
  fetch('/income', {
      body: JSON.stringify({
          amount: this.state.amount
      }),
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      }
  }).then(createdIncome => {
      return createdIncome.json();
  }).then(jsonedAmount => {
      this.setState({
          amount: '',
          income: [jsonedAmount, ...this.state.income]
      })
  }).catch(error => console.log(error));
  
}
deleteIncome = (id, index) => {
  fetch('income/' + id, {
      method: "DELETE"
  }).then(data => {
      this.setState({
          income: [
              ...this.state.income.slice(0, index),
              ...this.state.income.slice(index + 1)
          ]
      })
  })
}

  render() {
    return (
      <div className="main-container">
        <h3 className="text-center budget-app">Budget App</h3>
        <div className='container-app border'>          
          <Income income={this.state.income} handleIncomeChange={this.handleIncomeChange} handleIncomeSubmit={this.handleIncomeSubmit} deleteIncome={this.deleteIncome} bills={this.state.bills} />
          <div className='row'>
           <Expenses bills={this.state.bills} handleBillChange={this.handleBillChange}  handleBillSubmit={this.handleBillSubmit} deleteBill={this.deleteBill} handleBillUpdate={this.handleBillUpdate}/>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.querySelector('.container'));


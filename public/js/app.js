
class Income extends React.Component {
  constructor(props){
    super(props);
  }
 
  render() {
    // let totalIncome = this.props.firstIncome.amount + this.props.secondIncome.amount + this.props.thirdIncome.amount;
    let totalIncome = this.props.income.reduce(function(a,b) {return a + b.amount}, 0) 
    let totalBillAmount = this.props.bills.reduce(function(a,b) {return a + b.amount}, 0)
    return (
      <div className='row justify-content-center' >
      <form name='incomeForm' class="form-inline " onSubmit={this.props.handleIncomeSubmit}>
        <div class="form-group mb-2">
          <label htmlFor="amount" className="form-control-plaintext monthly-income">Monthly Income</label>
        </div>

        <div class="form-group mx-sm-3 mb-2">
          <input type="number" class="form-control" id="amount" min='0' step='.01' placeholder="amount" value={this.props.amount} onChange={this.props.handleIncomeChange} required/>
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
          <form name='myForm' onSubmit={this.props.handleBillSubmit}>
            <div className="form-group">
              <h4 className='text-center'>Add Expense</h4>
              <h6><label>Name</label></h6>
              <input className="form-control" type='text' id="name" placeholder="name" value={this.props.name} onChange={this.props.handleBillChange} required/>
              <br />
              <h6><label>Amount</label></h6>
              <input className="form-control" type='number' id="amount" step='.01' placeholder="amount" value={this.props.amount} onChange={this.props.handleBillChange} required/>
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
              </tr>
            </thead>
            <tbody>
             
            {this.props.bills.map((item,index) => {
                return (
                    <tr>
                        {/* <td onDoubleClick={() => this.props.changeEditMode()}> {item.name} </td> */}
                        {this.props.isInEditMode ? 
                          <td><form onSubmit={(event) => this.props.updateName(item, index, event)}><input type='text' id='name' defaultValue={item.name}
                          value={this.props.name} onChange={(event) => this.props.handleNameChange(index, event)}/>
                          <button type='submit' >ok</button></form></td>
                        : <td  onClick={() => this.props.changeEditMode()}>{item.name}</td>}
                         
                         {this.props.isInEditMode ? 
                          <td><form onSubmit={(event) => this.props.updateName(item, index, event)}><input type='number' min='0' step='.01' id='amount' defaultValue={item.amount}
                          value={this.props.amount} onChange={(event) => this.props.handleNameChange(index, event)}/>
                          <button type='submit' >ok</button></form></td>
                        : <td  onClick={() => this.props.changeEditMode()}>${item.amount}</td>}
                        {/* <td>${item.amount}</td> */}
                        <td onClick={() => this.props.handleBillUpdate(item, index)}>{item.isPaid ? `Paid`: 'Not paid'}</td>
                        <td><button onClick={() => this.props.deleteBill(item._id, index)}>Delete</button></td>
                    </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {/* onClick={() => this.props.updateNewName(item,index)} */}
      </div>
    )
  }
}
class App extends React.Component {
  state = {
    isInEditMode: false,
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
handleBillUpdate = (item, index) => {
  item.isPaid = !item.isPaid
  fetch('bills/' + item._id, {
      body: JSON.stringify(item),
      method: "PUT",
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      }
  })
  //converting response to json
  .then(updatedItem => updatedItem.json())
  // .then(updatedItem => console.log(updatedItem))
  //making a new get request to update state of updated item
  .then(jsonedItem => {
    fetch('/bills')
      .then(res => res.json())
      .then(bills => {
        this.setState({bills: bills})
      })
  })
  .catch(err => console.log(err));
}
changeEditMode = () => {
  this.setState({
    isInEditMode: !this.state.isInEditMode
  })
}
handleBillNameUpdate = (item, index, event) => {
  event.preventDefault();
  this.state.isInEditMode = !this.state.isInEditMode;
  console.log(item)
  fetch('bills/' + item._id, {
      body: JSON.stringify(item),
      method: "PUT",
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      }
  })
  //converting response to json
  .then(updatedItem => {return updatedItem.json()})
  // .then(updatedItem => console.log(updatedItem.name))
  // making a new get request to update state of updated item
  .then(jsonedItem => {
    fetch('/bills')
      .then(res => res.json())
      .then(bills => {
        this.setState({
          bills: bills
        })
      })
  })
  .catch(err => console.log(err));
}
handleNameChange = (index, event) => {
  //get bill index and copying array of bills
  const bills = [...this.state.bills];
  //changing name(property) to event.target.value
  bills[index][event.target.id] = event.target.value;
  this.setState({
    bills: bills
  })
  console.log(bills);
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
           <Expenses bills={this.state.bills} handleBillChange={this.handleBillChange}  handleBillSubmit={this.handleBillSubmit} deleteBill={this.deleteBill} handleBillUpdate={this.handleBillUpdate} updateName={this.handleBillNameUpdate} isInEditMode={this.state.isInEditMode} changeEditMode={this.changeEditMode} handleNameChange={this.handleNameChange}/>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.querySelector('.container'));


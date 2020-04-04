
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
    return (
      <div className='row justify-content-center' >
      <form class="form-inline " onSubmit={this.props.handleIncomeSubmit}>
        <div class="form-group mb-2">
          <label htmlFor="amount" class="form-control-plaintext">Monthly Income</label>
        </div>

        <div class="form-group mx-sm-3 mb-2">
          <input type="text" class="form-control" id="amount" placeholder="amount" value={this.props.amount} onChange={this.props.handleIncomeChange} />
        </div>
        <button type="submit" class="btn btn-primary mb-2">Submit</button>
      </form>
      <div className='row' >
        <div className='col border my-3 p-3'>
          <h3>Income</h3>
          <h4>
          {this.props.income.map((amount, index) => {
                    return (
                        <div>
                            <p key={amount._id}>${amount.amount}</p>
                            <button onClick={() => this.props.deleteIncome(amount._id, index)}>DELETE</button>
                        </div>
                    )
                })}
          </h4>
        </div>
        <div className='col border my-3 p-3'>
          <h3>Income remainder to budget</h3>
          {this.props.income.map((amount, index) => {
                    return (
                        <div>
                          {this.props.bills.map((bill, index) => {
                                return (
                                      <div>
                                          {amount.amount - bill.amount}
                                      </div>
                    )
                })}
                        </div>
                    )
                })}
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

        <div className="border my-3 p-3">
          <form onSubmit={this.props.handleBillSubmit}>
            <div className="form-group">
              <h3 className='text-center'>Add Expense</h3>
              <label>Name</label>
              <input className="form-control" type='text' id="name" placeholder="name" value={this.props.name} onChange={this.props.handleBillChange} /><br />
              <label>Amount</label>
              <input className="form-control" type='text' id="amount" placeholder="amount" value={this.props.amount} onChange={this.props.handleBillChange} />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Submit</button>
          </form>
        </div>
        

        {/* ***************** 
            bill Data display section
        ****************/}

        <div className=' border my-3 p-3'>
          <h3>Expense Details</h3>
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
                        <td> {item.name} </td>
                        <td>${item.amount}</td>
                        <td>Paid</td>
                        <td><button onClick={() => this.props.deleteBill(item._id, index)}>DELETE</button></td>
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
    }).then(jsonedBills => {
        this.setState({
            name: '',
            amount: '',
            bills: [jsonedBills, ...this.state.bills]
        })
    }).catch(error => console.log(error));
   
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
      <div>
        <h1 className="text-center">Budget App</h1>
        <div className='container-app border'>          
          <Income income={this.state.income} handleIncomeChange={this.handleIncomeChange} handleIncomeSubmit={this.handleIncomeSubmit} deleteIncome={this.deleteIncome} bills={this.state.bills}/>
          <div className='row'>
           <Expenses bills={this.state.bills} handleBillChange={this.handleBillChange}  handleBillSubmit={this.handleBillSubmit} deleteBill={this.deleteBill} />
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.querySelector('.container'));


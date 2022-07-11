const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ["D E P O S I T", "C A S H - B A C K"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label style={{ textAlign: "center", width: "100%" }}>
      <h5 style={{ color: "darkmagenta" }}>
        {choice[Number(!isDeposit)]}
      </h5>
      <input
        style={{ width: "90%" }}
        id="number-input"
        type="number"
        onChange={onChange}
      ></input>
      <input
        style={{ width: "90%", marginTop: "10px"}}
        type="submit"
        disabled={!isValid}
        value="Submit"
        id="submit-input"
      ></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  let status = `Balance: $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);

    if (Number(event.target.value) <= 0) {
      return setValidTransaction(false); //If the user introduce negative numbers or zero so isn't possible do transaction
    }
    if (atmMode === "Cash Back" && Number(event.target.value) > totalState) {
      setValidTransaction(false); //The transaction isn't possible if the value to cash back is greater than the available amount
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false); //Reset transaction status
    event.preventDefault();
  };
  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    setValidTransaction(false); //Disabled submit button if change mode
    if (event.target.value === "Deposit") setIsDeposit(true);
    else setIsDeposit(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "50%" }}>
          <h3>Client: Username</h3>
          <h3 id="total">{status}</h3>
          <div>
            <h5 className="font-texts">Select an action below to continue:</h5>
          </div>
          <div>
            <select
              style={{ width: "100%", height: "2.2em" }}
              onChange={(e) => handleModeSelect(e)}
              name="mode"
              id="mode-select"
            >
              <option id="no-selection" value=""></option>
              <option id="deposit-selection" value="Deposit">
                Deposit
              </option>
              <option id="cashback-selection" value="Cash Back">
                Cash Back
              </option>
            </select>
          </div>
        </div>
        <div style={{ marginLeft: "15px", width: "50%", alignSelf: "center"}}>
          {atmMode && (
            <ATMDeposit
              onChange={handleChange}
              isDeposit={isDeposit}
              isValid={validTransaction}
            ></ATMDeposit>
          )}
        </div>
      </div>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));

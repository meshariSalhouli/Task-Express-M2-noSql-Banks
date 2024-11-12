let accounts = require("../../accounts");
const Account = require("../../models/Account");

exports.accountList = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);

    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountDelete = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.findByIdAndDelete(accountId);
    res.status(200).json({ message: "account has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountUpdate = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.findByIdAndUpdate(
      accountId,
      { username: req.body.username, funds: req.body.funds },
      { new: true }
    );
    res.status(200).json(foundAccount);
  } catch (error) {
    res.status(500).json({ message: "Account not found" });
  }
};

exports.accountsGet = (req, res) => {
  const { id } = req.params;
  const foundAccount = accounts.find((account) => account.id === id);
  if (foundAccount) {
    foundAccount.funds = req.body.funds;
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Account not found" });
  }
  res.json(accounts);
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};

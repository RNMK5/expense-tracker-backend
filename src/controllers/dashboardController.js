const Transaction = require("../models/Transaction");

const getDashboardSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((item) => {
      if (item.type === "income") {
        totalIncome += item.amount;
      } else {
        totalExpense += item.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        balance,
        totalTransactions: transactions.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard summary",
      error: error.message,
    });
  }
};

module.exports = { getDashboardSummary };
const Transaction = require("../models/Transaction");

const getMonthlyReport = async (req, res) => {
  try {
    const year = Number(req.query.year);
    const month = Number(req.query.month);

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const transactions = await Transaction.find({
      user: req.user._id,
      date: { $gte: startDate, $lt: endDate },
    });

    let income = 0;
    let expense = 0;

    transactions.forEach((item) => {
      if (item.type === "income") income += item.amount;
      else expense += item.amount;
    });

    const savings = income - expense;

    let financialStatus = "Balanced";
    if (savings > 0) financialStatus = "Good";
    if (savings < 0) financialStatus = "Needs Attention";

    res.status(200).json({
      success: true,
      data: {
        year,
        month,
        income,
        expense,
        savings,
        totalTransactions: transactions.length,
        financialStatus,
        message:
          savings > 0
            ? "You saved money this month."
            : savings < 0
            ? "Your expenses exceeded your income."
            : "Your income and expenses were equal.",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate monthly report",
      error: error.message,
    });
  }
};

module.exports = { getMonthlyReport };
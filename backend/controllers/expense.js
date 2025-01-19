const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const income = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !description || !date) {
      return res
        .status(400)
        .json({ message: "Bütün alanları doldurmak zorunludur" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Tutar pozitif bir SAYI olmalıdır" });
    }
    await income.save();
    res.status(200).json({ message: "Gider Başarıyla Eklendi" });
  } catch (error) {
    res.status(500).json({ message: "Server Hata Verdi Dön Bak Bi" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const incomes = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Hata Verdi" });
  }
};
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Gider Deleted Reisim" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Error" });
    });
};

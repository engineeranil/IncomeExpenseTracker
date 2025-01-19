const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const income = IncomeSchema({
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
    res.status(200).json({ message: "Gelir Başarıyla Eklendi" });
  } catch (error) {
    res.status(500).json({ message: "Server Hata Verdi Dön Bak Bi" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Hata Verdi" });
  }
};
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted Reisim" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Error" });
    });
};

import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import TransactionChart from "../Chart/TransactionChart";
import { dollar } from "../../utils/icons";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import ExpenseChart from "../Chart/ExpenseChart";
import IncomeChart from "../Chart/IncomeChart";
function Dashboard() {
  const {
    totalExpenses,
    totalIncome,
    totalBalance,
    transactionHistory,
    getIncomes,
    getExpenses,
    incomes,
    expenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);
  const minExpense =
    expenses.length > 0 ? Math.min(...expenses.map((item) => item.amount)) : 0;
  const maxExpense =
    expenses.length > 0 ? Math.max(...expenses.map((item) => item.amount)) : 0;
  const minIncome =
    expenses.length > 0 ? Math.min(...incomes.map((item) => item.amount)) : 0;
  const maxIncome =
    expenses.length > 0 ? Math.max(...incomes.map((item) => item.amount)) : 0;

  const balance = totalBalance();
  return (
    <DashboardStyled ba>
      <InnerLayout>
        <h1>All Transactions</h1>

        {/* Üst Satır */}
        <div className="row row-top">
          <div className="chart-large">
            <TransactionChart />
          </div>
          <div className="summary-cards">
            <div className="card income">
              <h2>Total Income</h2>
              <p>
                {dollar} {totalIncome()}
              </p>
            </div>
            <div className="card expense">
              <h2>Total Expense</h2>
              <p>
                {dollar} {totalExpenses()}
              </p>
            </div>
            <div className="card balance">
              <h2>Total Balance</h2>
              <p>
                {dollar} {balance}
              </p>
            </div>
          </div>
        </div>

        {/* Orta Satır */}
        <div className="row row-middle">
          <div className="chart-small">
            <ExpenseChart />
          </div>
          <div className="chart-small">
            <IncomeChart />
          </div>
        </div>

        {/* Alt Satır */}
        <div className="row row-bottom">
          <div className="recent-history">
            <History />
          </div>
          <div className="min-max-section">
            <div className="min-max-item">
              <h4>Min Income</h4>
              <p>{minIncome}</p>
            </div>
            <div className="min-max-item">
              <h4>Max Income</h4>
              <p>{maxIncome}</p>
            </div>
            <div className="min-max-item">
              <h4>Min Expense</h4>
              <p>{minExpense}</p>
            </div>
            <div className="min-max-item">
              <h4>Max Expense</h4>
              <p>{maxExpense}</p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }

  /* === Üst Satır (Transaction + Cards) === */
  .row-top {
    display: grid;
    grid-template-columns: 7fr 3fr;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .chart-large {
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      height: 400px;
    }

    .summary-cards {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .card {
        background: #fff;
        border-radius: 10px;
        padding: 1rem;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

        h2 {
          font-size: 1rem;
        }

        p {
          font-size: 1.5rem;
          font-weight: bold;
        }
      }

      .income {
        background: #e8f5e9;
        p {
          color: #2e7d32;
        }
      }

      .expense {
        background: #ffebee;
        p {
          color: #c62828;
        }
      }

      .balance {
        background: ${(props) => (props.balance >= 0 ? "#e8f5e9" : "#ffebee")};
        p {
          color: ${(props) => (props.balance >= 0 ? "#2e7d32" : "#c62828")};
        }
      }
    }
  }

  /* === Orta Satır (Expense & Income Charts) === */
  .row-middle {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .chart-small {
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      height: 400px;
    }
  }

  /* === Alt Satır (Recent History & Min-Max) === */
  .row-bottom {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;

    .recent-history {
      background: #fff;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .min-max-section {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;

      .min-max-item {
        text-align: center;
        background: #fff;
        padding: 0.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        h4 {
          font-size: 0.9rem;
          color: #771778;
        }

        p {
          font-size: 1.2rem;
          font-weight: bold;
        }
      }
    }
  }

  /* === Responsive Tasarım === */
  @media (max-width: 768px) {
    .row-top,
    .row-middle,
    .row-bottom {
      grid-template-columns: 1fr;
    }
  }
`;
export default Dashboard;

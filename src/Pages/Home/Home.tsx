import "./Home.css";
import React, { useState, useEffect } from "react";
import ModalComponent from "../../components/Modal/ModalComponent.js";
import Dropdown from "../../components/Dropdown/Dropdown.js";
import Card from "../../components/Card/Card.js";
import { ResetIcon } from "../../helpers/Icons.jsx";
import InputBox from "../../components/InputBox/InputBox.js";

// --- Interfaces ---
interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface FilterState {
  category: string;
  minAmount: string;
  maxAmount: string;
  startDate: string;
  endDate: string;
}

interface NewExpenseState {
  title: string;
  amount: string;
  category: string;
  date: string;
  status: boolean;
}

const Dummy = () => {
  // --- State ---
  const [expenses, setExpenses] = useState<Expense[]>();

  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

  const [filters, setFilters] = useState<FilterState>({
    category: "All Categories",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  });

  const [newExpense, setNewExpense] = useState<NewExpenseState>({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    status: false,
  });

  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Health",
    "Other",
  ];

  // --- Filtering Logic (AND Condition) ---
  const filterData = () => {
    if (!expenses) return;

    const result = expenses.filter((item) => {
      // 1. Category
      const matchCategory =
        filters.category === "All Categories" ||
        item.category === filters.category;

      // 2. Min Amount
      const matchMin =
        filters.minAmount === "" ||
        item.amount >= parseFloat(filters.minAmount);

      // 3. Max Amount
      const matchMax =
        filters.maxAmount === "" ||
        item.amount <= parseFloat(filters.maxAmount);

      // 4. Start Date
      const matchStart =
        filters.startDate === "" ||
        new Date(item.date) >= new Date(filters.startDate);

      // 5. End Date
      const matchEnd =
        filters.endDate === "" ||
        new Date(item.date) <= new Date(filters.endDate);

      // AND Logic: All must be true
      return matchCategory && matchMin && matchMax && matchStart && matchEnd;
    });

    setFilteredExpenses(result);
  };

  useEffect(() => {
    filterData();
  }, [filters, expenses]);

  // --- Handlers ---
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) {
      alert("Please enter both title and amount.");
      return;
    }

    const expense: Expense = {
      id: Date.now(),
      title: newExpense.title,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date,
    };

    let _Ex = expenses;
    if (_Ex) {
      setExpenses([..._Ex, expense]);
    } else {
      setExpenses([expense]);
    }
    setNewExpense({
      title: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      status: false,
    });
  };

  const deleteExpense = (id: number) => {
    console.log(id);
    let _data = expenses;
    if (!_data) return;
    _data = _data.filter((exp) => exp.id != id);
    setExpenses(_data);
  };

  const clearFilters = () => {
    setFilters({
      category: "All Categories",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: "",
    });
  };

  useEffect(() => {
    const list = localStorage.getItem("list");
    console.log(list);

    if (list && typeof list === "string") {
      setExpenses(JSON.parse(list));
    }
  }, []);

  useEffect(() => {
    if (expenses) {
      localStorage.setItem("list", JSON.stringify(expenses));
    }
  }, [expenses]);

  return (
    <>
      <div className="app-container">
        <header className="header">
          <div>
            <h1>Expense Tracker</h1>
          </div>
          <button
            onClick={() =>
              setNewExpense((p) => ({
                ...p,
                status: true,
              }))
            }
            className={`btn_toggle_filter`}
          >
            Add Expense
          </button>
        </header>

        <div className="main_grid">
          <div className="card">
            <div className="card-header">
              <div className="card-title-flex">
                <span>Filter Expenses</span>
              </div>
              <button onClick={clearFilters} className="btn-reset">
                <ResetIcon size={12} />
                Reset
              </button>
            </div>

            <div className="form-group">
              <Dropdown
                list={["All Categories", ...categories]}
                onSelect={(value) => {
                  setFilters((p) => ({ ...p, category: value }));
                }}
                selectedValue={filters.category}
                label="Category"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Amount Range</label>
              <div className="input-row">
                <div className="input-wrapper">
                  <InputBox
                    type="number"
                    placeholder="Min"
                    value={filters.minAmount}
                    onChange={(e) =>
                      setFilters({ ...filters, minAmount: e.target.value })
                    }
                    className="input-control input-with-icon"
                  />
                </div>
                <div className="input-wrapper">
                  <InputBox
                    type="number"
                    placeholder="Max"
                    value={filters.maxAmount}
                    onChange={(e) =>
                      setFilters({ ...filters, maxAmount: e.target.value })
                    }
                    className="input-control input-with-icon"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Date Range</label>
              <div className="input-row">
                <InputBox
                  type="date"
                  placeholder="Select minimum date"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters({ ...filters, startDate: e.target.value })
                  }
                  className="input-control"
                />

                <InputBox
                  placeholder="Select maximun date"
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters({ ...filters, endDate: e.target.value })
                  }
                  className="input-control"
                />
              </div>
            </div>
          </div>

          {newExpense.status && (
            <ModalComponent
              header="Add New Expense"
              onClose={() => {
                setNewExpense((p) => ({
                  ...p,
                  status: false,
                }));
              }}
            >
              <div className="card card-dark">
                <form onSubmit={handleAddExpense}>
                  <div className="form-group">
                    <InputBox
                      placeholder="Title (e.g., Lunch)"
                      type="text"
                      value={newExpense.title}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          title: e.target.value,
                        })
                      }
                      className="input-control dark-input"
                    />
                  </div>

                  <div className="form-group">
                    <div className="input-wrapper">
                      <InputBox
                        type="number"
                        placeholder="0.00"
                        value={newExpense.amount}
                        onChange={(e) =>
                          setNewExpense({
                            ...newExpense,
                            amount: e.target.value,
                          })
                        }
                        className="input-control dark-input input-with-icon"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <InputBox
                      placeholder="add date"
                      type="date"
                      value={newExpense.date}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, date: e.target.value })
                      }
                      className="input-control dark-input"
                    />
                  </div>

                  <div className="chips_container">
                    {categories.map((cate, _idx) => (
                      <div
                        key={_idx}
                        id={String(_idx)}
                        className={`chips ${
                          newExpense.category === cate ? "active_chip" : ""
                        }`}
                        onClick={() => {
                          setNewExpense((p) => ({
                            ...p,
                            category: cate,
                          }));
                        }}
                      >
                        {cate}
                      </div>
                    ))}
                  </div>
                  <button type="submit" className="btn-submit">
                    Add Expense
                  </button>
                </form>
              </div>
            </ModalComponent>
          )}

          {/* Main Content: Expense List */}
          <div className="content">
            <div className="status-bar">
              <span>
                Showing <b>{filteredExpenses.length}</b> of{" "}
                {expenses && expenses.length}
              </span>
              <span>
                Total:{" "}
                <span>
                  {filteredExpenses
                    .reduce((acc, curr) => acc + curr.amount, 0)
                    .toFixed(2)}
                </span>
              </span>
            </div>

            <div className="expense-list">
              {filteredExpenses.length === 0 && (
                <div className="empty-state">
                  <h3>No matches found</h3>
                  <p>Try adjusting your filters to see more results.</p>
                  <button className="clear_filter_btn" onClick={clearFilters}>
                    Clear all filters
                  </button>
                  <br />
                  <button
                    className="clear_filter_btn"
                    onClick={() =>
                      setNewExpense((p) => ({
                        ...p,
                        status: true,
                      }))
                    }
                  >
                    Add Expense
                  </button>
                </div>
              )}
              {filteredExpenses.length > 0 &&
                filteredExpenses.map((expense) => (
                  <Card
                    key={expense.id}
                    id={expense.id}
                    title={expense.title}
                    amount={expense.amount}
                    category={expense.category}
                    date={expense.date}
                    deleteExpense={deleteExpense}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dummy;

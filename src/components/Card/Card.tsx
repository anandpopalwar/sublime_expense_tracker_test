import { TrashIcon } from "../../helpers/Icons.jsx";

interface ExpenseProp {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  deleteExpense: (id: number) => void;
}
const Card = ({
  id,
  title,
  amount,
  category,
  date,
  deleteExpense,
}: ExpenseProp) => {
  return (
    <div key={id} className="expense-item">
      <div className="expense-left">
        <div className="expense-details">
          <h3>{title}</h3>
          <div className="expense-meta">
            <span className="meta-tag">{category}</span>
            <span className="meta-tag">{date}</span>
          </div>
        </div>
      </div>

      <div className="expense-right">
        <span className="expense-amount">₹{amount.toFixed(2)}</span>
        <button onClick={() => deleteExpense(id)} className="btn-delete">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default Card;

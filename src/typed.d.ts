interface Expenses {
  id: number;
  category: Category;
}
interface Category {
  id: number;
  text: string;
  color: string;
}
interface Expense {
  id: number;
  money: number;
  category: Category;
  date: Date | string;
}

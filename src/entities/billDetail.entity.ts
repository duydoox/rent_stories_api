import { Bill } from './bill.entity';
import { Book } from './book.entity';

export class BillDetail {
  ID: number;
  sumOfMoney: number;
  bill: Bill;
  book: Book;
}

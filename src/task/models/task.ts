export class Task {
  //   private id: string;
  //   private title: string;
  //   private year: number;

  constructor(
    public id: string,
    public title: string,
    public year: number,
    public statut: string,
    public createdAt: Date,
  ) {
    // this.id = id;
    // this.title = title;
    // this.year = year;
  }
}

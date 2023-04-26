class Vacation {
  public id: number;
  public destination: string;
  public startDate: Date;
  public endDate: Date;
  public vacDesc: string;
  public vacPrice: number;
  public vacImg: string;

  constructor(
    id: number,
    destination: string,
    startDate: Date,
    endDate: Date,
    vacDesc: string,
    vacPrice: number,
    vacImg: string
  ) {
    this.id = id;
    this.destination = destination;
    this.startDate =
      startDate < new Date()
        ? (() => {
            throw new Error("Start date cannot be earlier than today.");
          })()
        : startDate;
    this.endDate =
      endDate < startDate
        ? (() => {
            throw new Error("End date cannot be earlier than start date.");
          })()
        : endDate;
    this.vacDesc = vacDesc;
    this.vacPrice = vacPrice;
    this.vacImg = vacImg;
  }
}

export default Vacation;

class Config {
  public WebPort = 4000;
  public mySQLhost = "localhost";
  public mySQLuser = "root";
  public mySQLpass = "12345678";
  public mySQLdb = "vacations";
}

const config = new Config();
export default config;

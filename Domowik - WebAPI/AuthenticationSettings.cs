namespace Domowik___WebAPI
{
    public class AuthenticationSettings
    {
        public string JwtKey { get; set; }
        public int JwtExprireDays { get; set; }
        public string JwtIssuer { get; set; }
    }
}

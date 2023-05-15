using server.Models.Enums;

namespace server.Dto
{
    public class AdministratorDto
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FirstAndLastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public TypeOfUser Type { get; set; }
    }
}

export default class SellerDto{
    constructor(id, username, password, email, firstAndLastName, dateOfBirth, address, type, approval)
    {
        this.Id = id;
        this.Username = username;
        this.Password = password;
        this.Email = email;
        this.FirstAndLastName = firstAndLastName;
        this.DateOfBirth = dateOfBirth;
        this.Address = address;
        this.Type = type;
        this.Approval = approval;
    }
}
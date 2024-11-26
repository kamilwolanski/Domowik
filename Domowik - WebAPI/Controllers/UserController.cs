using Domowik___WebAPI.Models;
using Domowik___WebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Domowik___WebAPI.Controllers
{
    [Route("api/user")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpDelete]
        public IActionResult Delete()
        {
            _userService.DeleteUser();

            return Ok();
        }

        [HttpGet]
        public IActionResult Get()
        {
           var user = _userService.GetUser();

           return Ok(user);
        }

        [HttpPut]
        public IActionResult Update([FromBody] UserUpdateDto dto)
        {
            _userService.UpdateUser(dto);

            return Ok();
        }

        [HttpGet("family")]
        public ActionResult<FamilyDto> GetUserFamily()
        {
            var family = _userService.GetUserFamily();

            return Ok(family);
        }
    }
}

using AutoMapper;
using Domowik___WebAPI.Entities;
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
        private readonly IMapper _mapper;
        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
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
        public async Task<ActionResult> GetUserFamily()
        {
            var family = await _userService.GetUserFamily();
            var result = _mapper.Map<FamilyDto>(family);

            return Ok(result);
        }
    }
}

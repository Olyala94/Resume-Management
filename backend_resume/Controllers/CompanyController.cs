using AutoMapper;
using backend_resume.Core.Context;
using backend_resume.Core.Dtos.Company;
using backend_resume.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_resume.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;
        public CompanyController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;   
        }

        // CRUD 

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyCreateDto companyCreateDto)
        {
            var newCompany = _mapper.Map<Company>(companyCreateDto); 
            await _context.Companies.AddAsync(newCompany);  
            await _context.SaveChangesAsync();
            return Ok("Company Created Successfully");
        }

        // Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompanies() 
        {
            var companies = await _context.Companies.OrderByDescending(q=>q.CreatedAt).ToListAsync();   
            var convertedCompanies = _mapper.Map<IEnumerable<CompanyGetDto>>(companies);
            return Ok(convertedCompanies);
        }

        // Read (Get Company By ID)


        // Update

        // Delete
    }
}

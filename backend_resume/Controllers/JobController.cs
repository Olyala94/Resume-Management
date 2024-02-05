using AutoMapper;
using backend_resume.Core.Context;
using backend_resume.Core.Dtos.Job;
using backend_resume.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_resume.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private ApplicationDbContext _context;
        private IMapper _mapper;
        public JobController(IMapper mapper, ApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        // CRUD

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateJob([FromBody] JobCreateDto jobCreateDto)
        {
            var newJob = _mapper.Map<Job>(jobCreateDto);
            await _context.Jobs.AddAsync(newJob);
            await _context.SaveChangesAsync();
            return Ok("Job Created Successfully");
        }

        // Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<JobGetDto>>> GetJobs()
        {
            var jobs = await _context.Jobs.Include(job => job.Company).OrderByDescending(x => x.CreatedAt).ToListAsync();
            var convertedJobs = _mapper.Map<IEnumerable<JobGetDto>>(jobs);
            return Ok(convertedJobs);
        }


        // Update

        // Delete
    }
}

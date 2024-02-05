using AutoMapper;
using backend_resume.Core.Context;
using backend_resume.Core.Dtos.Candidate;
using backend_resume.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_resume.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper;

        public CandidateController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCandidate([FromForm] CandidateCreateDto candidateCreateDto, IFormFile pdfFile)
        {
            // Firs => Save pdf to Server
            // Then  => Save url into our entity

            var fiveMagaByte = 5 * 1024 * 1024;
            var pdfMimeType = "application/pdf";

            if (pdfFile.Length > fiveMagaByte || pdfFile.ContentType != pdfMimeType)
            {
                return BadRequest("Five is not valid");
            }

            var resumeUrl = Guid.NewGuid().ToString() + ".pdf";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", resumeUrl);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }

            var newCandidate = _mapper.Map<Candidate>(candidateCreateDto);
            newCandidate.ResumeUrl = resumeUrl;
            await _context.Candidates.AddAsync(newCandidate);
            await _context.SaveChangesAsync();

            return Ok("Candidate Saved Successfully");
        }


        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CandidateGetDto>>> GetCandidates()
        {
            var candidate = await _context.Candidates.Include(x => x.Job).OrderByDescending(q=>q.CreatedAt).ToListAsync();
            var convertedCandidate = _mapper.Map<IEnumerable<CandidateGetDto>>(candidate);

            return Ok(convertedCandidate);  
        }

        // Read (Download Pdf File)
        [HttpGet]
        [Route("download/{url}")]
        public IActionResult DownloadPdfFile(string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", url);

            if(!System.IO.File.Exists(filePath)) 
            {
                return NotFound("File Not Found");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePath);

            var file = File(pdfBytes, "application/pdf", url);
            return file;
        }

        // Read (Get Candidate By ID)


        // Update

        // Delete
    }
}

using backend_resume.Core.Enums;

namespace backend_resume.Core.Dtos.Job
{
    public class JobGetDto
    {
        public long ID { get; set; }
        public string Title { get; set; }
        public JobLevel Level { get; set; }
        //Relations
        public long CompanyId { get; set; }
        public string CompanyName { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}

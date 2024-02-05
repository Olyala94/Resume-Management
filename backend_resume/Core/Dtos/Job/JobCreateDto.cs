using backend_resume.Core.Enums;

namespace backend_resume.Core.Dtos.Job
{
    public class JobCreateDto
    {
        public string Title { get; set; }
        public JobLevel Level { get; set; }

        //Relations
        public long CompanyId { get; set; }
    }
}

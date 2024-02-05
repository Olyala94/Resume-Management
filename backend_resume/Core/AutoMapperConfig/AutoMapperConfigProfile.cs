using AutoMapper;
using backend_resume.Core.Dtos.Candidate;
using backend_resume.Core.Dtos.Company;
using backend_resume.Core.Dtos.Job;
using backend_resume.Core.Entities;

namespace backend_resume.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile : Profile
    {
        public AutoMapperConfigProfile()
        {
            #region Company
            CreateMap<CompanyCreateDto, Company>().ReverseMap();
            CreateMap<CompanyGetDto, Company>().ReverseMap();
            #endregion

            #region Job
            CreateMap<JobCreateDto, Job>().ReverseMap();
            CreateMap<Job, JobGetDto>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name)).ReverseMap();
            #endregion

            #region Candidate
            CreateMap<CandidateCreateDto, Candidate>().ReverseMap();
            CreateMap<Candidate, CandidateGetDto>()
                .ForMember(dest => dest.JobTitle, opt => opt.MapFrom(src => src.Job.Title)).ReverseMap();
            CreateMap<CandidateCreateDto, Candidate>()
               .ForMember(dest => dest.JobId, opt => opt.MapFrom(src => src.JobId));

            #endregion   
        }
    }
}

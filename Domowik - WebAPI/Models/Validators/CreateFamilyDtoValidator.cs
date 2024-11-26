using Domowik___WebAPI.Data;
using Domowik___WebAPI.Services;
using FluentValidation;

namespace Domowik___WebAPI.Models.Validators
{
    public class CreateFamilyDtoValidator:  AbstractValidator<CreateFamilyDto>
    {
        public CreateFamilyDtoValidator(DomowikDbContext dbContext, IUserContextService userContextService)
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("To pole nie może być puste")
                .MaximumLength(25).WithMessage("Maksymalna długość nazwy Twojej rodziny to 25 znaków");
        }
    }
}

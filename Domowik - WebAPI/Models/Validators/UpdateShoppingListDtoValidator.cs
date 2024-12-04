using FluentValidation;

namespace Domowik___WebAPI.Models.Validators
{
    public class UpdateShoppingListDtoValidator: AbstractValidator<UpdateShoppingListDto>
    {
        public UpdateShoppingListDtoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("To pole nie może być puste")
                .MaximumLength(25).WithMessage("Maksymalna długość nazwy Twojej listy zakupów to 25 znaków");

        }
    }
}

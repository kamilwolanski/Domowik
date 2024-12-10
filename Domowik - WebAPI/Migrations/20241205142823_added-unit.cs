using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domowik___WebAPI.Migrations
{
    public partial class addedunit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Unit",
                table: "ShoppingListProducts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Unit",
                table: "ShoppingListProducts");
        }
    }
}

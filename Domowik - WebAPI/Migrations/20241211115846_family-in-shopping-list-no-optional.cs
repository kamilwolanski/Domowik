using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domowik___WebAPI.Migrations
{
    public partial class familyinshoppinglistnooptional : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingLists_Families_FamilyId",
                table: "ShoppingLists");

            migrationBuilder.AlterColumn<int>(
                name: "FamilyId",
                table: "ShoppingLists",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingLists_Families_FamilyId",
                table: "ShoppingLists",
                column: "FamilyId",
                principalTable: "Families",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingLists_Families_FamilyId",
                table: "ShoppingLists");

            migrationBuilder.AlterColumn<int>(
                name: "FamilyId",
                table: "ShoppingLists",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingLists_Families_FamilyId",
                table: "ShoppingLists",
                column: "FamilyId",
                principalTable: "Families",
                principalColumn: "Id");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domowik___WebAPI.Migrations
{
    public partial class fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Families_HeadId",
                table: "Families");

            migrationBuilder.AddColumn<int>(
                name: "FamilyId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Families_HeadId",
                table: "Families",
                column: "HeadId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Families_HeadId",
                table: "Families");

            migrationBuilder.DropColumn(
                name: "FamilyId",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Families_HeadId",
                table: "Families",
                column: "HeadId");
        }
    }
}

import { Type } from "class-transformer"
import { IsOptional, IsPositive } from "class-validator"

export class PaginationDto {

    @IsPositive()
    @IsOptional()
    @Type( () => Number)
    page?: number = 1 // valores por default en caso que no los manden.


    @IsPositive()
    @IsOptional()
    @Type( () => Number)
    limit?: number = 10
}
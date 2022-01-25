import {
  ArrayMaxSize,
  ArrayMinSize,
  IsString,
  MinLength,
} from 'class-validator';

export class JoinGameDto {
  @IsString()
  @MinLength(2)
  readonly name: string;

  @IsString()
  @MinLength(2)
  readonly surname: string;

  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @MinLength(2, { each: true })
  readonly wishlist: Array<string>;
}

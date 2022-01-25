import {
  ArrayMaxSize,
  ArrayMinSize,
  IsString,
  MinLength,
} from 'class-validator';

export class JoinGameDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly surname: string;

  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @MinLength(2, { each: true })
  readonly wishlist: Array<string>;
}

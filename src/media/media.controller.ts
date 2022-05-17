import { Controller, Get, Query } from "@nestjs/common";
import { MediaService } from "@app/media/media.service";
import { Public } from "@app/auth/decorators";

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Public()
  @Get()
  async getInfo(@Query('id') mediaId: string) {
    return await this.mediaService.getInfo(mediaId)
  }
}

import { Injectable } from '@nestjs/common';
import { api } from "@app/utils/api";

@Injectable()
export class MediaService {
  async getInfo(id: string) {
    return await api.get(`/Title/k_m3g069z8/${id}`).then(res => res.data)
  }
}

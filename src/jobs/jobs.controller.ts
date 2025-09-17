import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  @Get()
  getAllJobs() {
    return this.jobService.getAllJobs();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.jobService.getJobById(Number(id));
  }

  @Post()
  create(@Body() body: { title: string; qualification: string }) {
    return this.jobService.createJob(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title: string; qualification: string },
  ) {
    return this.jobService.updateJob(Number(id), body);
  }

  @Patch(':id')
  patch(
    @Param('id') id: string,
    @Body() body: Partial<{ title: string; qualification: string }>,
  ) {
    return this.jobService.patchUpdateJob(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.jobService.deleteJob(Number(id)); 
  }
}

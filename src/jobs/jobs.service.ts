import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './jobs.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  // GET 
  getAllJobs(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  // GET
  async getJobById(id: number): Promise<Job> {
    const job = await this.jobRepository.findOneBy({ id });
    if (!job) throw new NotFoundException('Job not found!');
    return job;
  }

  // POST
  createJob(job: { title: string; qualification: string }): Promise<Job> {
    const newJob = this.jobRepository.create(job); 
    return this.jobRepository.save(newJob);        
  }

  // PUT 
  async updateJob(id: number, data: { title: string; qualification: string }): Promise<Job> {
    const job = await this.getJobById(id);
    job.title = data.title;
    job.qualification = data.qualification;
    return this.jobRepository.save(job);
  }

  // PATCH 
  async patchUpdateJob(id: number, data: Partial<{ title: string; qualification: string }>): Promise<Job> {
    const job = await this.getJobById(id);
    Object.assign(job, data);
    return this.jobRepository.save(job);
  }

  // DELETE
  async deleteJob(id: number): Promise<{ message: string; job: Job }> {
    const job = await this.getJobById(id);
    await this.jobRepository.remove(job);
    return { message: 'Job Deleted', job };
  }
}

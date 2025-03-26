import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards,UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { PolicyTypesService } from './policy-types.service';
import { CreatePolicyTypeDto } from './dto/create-policy-type.dto';
import { UpdatePolicyTypeDto } from './dto/update-policy-type.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('policy-types')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class PolicyTypesController {
  constructor(private readonly policyTypesService: PolicyTypesService) {}

  @Post()
  create(@Body() createPolicyTypeDto: CreatePolicyTypeDto) {
    return this.policyTypesService.create(createPolicyTypeDto);
  }

  @Get()
  findAll() {
    return this.policyTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.policyTypesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePolicyTypeDto: UpdatePolicyTypeDto) {
    return this.policyTypesService.update(id, updatePolicyTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.policyTypesService.remove(id);
  }
}

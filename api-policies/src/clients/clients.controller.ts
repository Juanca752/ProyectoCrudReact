
import { Controller, Get, Post, Body, Param,ParseIntPipe, Put, Delete,UseGuards,UseInterceptors, ClassSerializerInterceptor  } from '@nestjs/common';

  import { ClientsService } from './clients.service';
  import { CreateClientDto } from './dto/create-client.dto';
  import { UpdateClientDto } from './dto/update-client.dto';
  import { Client } from './client.entity';
  import { AuthGuard } from '@nestjs/passport';
  
  @Controller('clients')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}
  
    @Post()
    create(@Body() createClientDto: CreateClientDto): Promise<Client> {
      return this.clientsService.create(createClientDto);
    }
  
    @Get()
    findAll(): Promise<Client[]> {
      return this.clientsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Client> {
      return this.clientsService.findOne(id);
    }
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateClientDto: UpdateClientDto,
    ): Promise<Client> {
      return this.clientsService.update(id, updateClientDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.clientsService.remove(id);
    }
  }
  
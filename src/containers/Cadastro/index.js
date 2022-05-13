import React from 'react'
import { Container, Label, Input, ErrorMessage, Button } from './styles'
import { useForm } from 'react-hook-form' // Biblioteca para validar forms
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import validarCPF from '../../validations/validateCPF'
import api from '../../services/api'
import logoRevect from '../../assets/revectLogo.png'
import { useHistory } from 'react-router-dom'

function Cadastro () {
  const { push } = useHistory()

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string().email('Digite um email válido').required('O email é obrigatório'),
    cpf: Yup.string().required('O CPF é obrigatório'),
    genre: Yup.string().required('O gênero é obrigatório'),
    // birth: Yup.date().max(new Date().toLocaleDateString()).required('A data de nascimento é obrigatório'),
    cell_phone: Yup.string().required('O número de celular é obrigatório'),
    occupation: Yup.string(),
    street: Yup.string().required('A rua é obrigatório'),
    number: Yup.string().required('O número é obrigatório'),
    complement: Yup.string(),
    district: Yup.string().required('O bairro é obrigatório'),
    city: Yup.string().required('A cidade é obrigatório'),
    state: Yup.string().required('O estado é obrigatório'),
    country: Yup.string().required('O país é obrigatório'),
    postal_code: Yup.string().required('O CEP é obrigatório')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async customerData => {
    try {
      const response = await api.post('customer', {
        name: customerData.name,
        email: customerData.email,
        cpf: validarCPF(customerData.cpf) ? customerData.cpf : toast.error('CPF inválido'),
        genre: customerData.genre,
        birth: customerData.birth,
        cell_phone: customerData.cell_phone,
        occupation: customerData.occupation,
        street: customerData.street,
        number: customerData.number,
        complement: customerData.complement,
        district: customerData.district,
        city: customerData.city,
        state: customerData.state,
        country: customerData.country,
        postal_code: customerData.postal_code
      }, { validateStatus: () => true })

      if (response.status === 201 || response.status === 200) {
        toast.success('Cadastro realizado com sucesso')
      } else if (response.status === 409) {
        toast.error('Usuário já cadastrado, por favor confirme novamente seus dados')
      } else if (response.status === 400) {
        toast.error('Verifique seu número de telefone')
        console.log(response)
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error('Falha no sistema, tente novamente')
      console.log(err)
    }

    setTimeout(() => {
      push('list')
    }, 2000)
  }

  return (
        <Container>
            <img src={logoRevect} alt='Logo Revect' />
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Label>Nome</Label>
                <Input placeholder='Ex.: João da Silva' type='text' {...register('name')}/>
                <ErrorMessage>{errors.name?.message}</ErrorMessage>

                <Label>Email</Label>
                <Input placeholder='Ex.: seuemail@email.com' type='email' {...register('email')} />
                <ErrorMessage>{errors.email?.message}</ErrorMessage>

                <Label>CPF</Label>
                <Input placeholder='Ex.: 12345678910' type='text' {...register('cpf')}/>
                <ErrorMessage>{errors.cpf?.message}</ErrorMessage>

                <Label>Gênero</Label>
                <Input placeholder='Ex.: Masculino' type='text' {...register('genre')}/>
                <ErrorMessage>{errors.genre?.message}</ErrorMessage>

                <Label>Data de Nascimento</Label>
                <Input type='date' {...register('birth')}/>
                <ErrorMessage>{errors.birth?.message}</ErrorMessage>

                <Label>Número de Celular</Label>
                <Input placeholder='Ex.: +55 (11) 912345678' type='text' {...register('cell_phone')}/>
                <ErrorMessage>{errors.cell_phone?.message}</ErrorMessage>

                <Label>Profissão</Label>
                <Input placeholder='Ex.: Professor' type='text' {...register('occupation')}/>
                <ErrorMessage>{errors.occupation?.message}</ErrorMessage>

                <Label>Avenida / Rua</Label>
                <Input placeholder='Ex.: Avenida 23 de maio' type='text' {...register('street')} />
                <ErrorMessage>{errors.street?.message}</ErrorMessage>

                <Label>Número</Label>
                <Input placeholder='Ex.: 123' type='text' {...register('number')} />
                <ErrorMessage>{errors.number?.message}</ErrorMessage>

                <Label>Complemento</Label>
                <Input placeholder='Ex.: Bloco 1' type='text' {...register('complement')}/>
                <ErrorMessage>{errors.complement?.message}</ErrorMessage>

                <Label>Bairro</Label>
                <Input placeholder='Ex.: Interlagos' type='text' {...register('district')}/>
                <ErrorMessage>{errors.district?.message}</ErrorMessage>

                <Label>Cidade</Label>
                <Input placeholder='Ex.: São Paulo' type='text' {...register('city')}/>
                <ErrorMessage>{errors.city?.message}</ErrorMessage>

                <Label>Estado</Label>
                <Input placeholder='Ex.: São Paulo' type='text' {...register('state')}/>
                <ErrorMessage>{errors.state?.message}</ErrorMessage>

                <Label>País</Label>
                <Input placeholder='Ex.: Brasil' type='text' {...register('country')}/>
                <ErrorMessage>{errors.country?.message}</ErrorMessage>

                <Label>Código Postal (CEP)</Label>
                <Input placeholder='Ex.: 01233445' type='number' {...register('postal_code')}/>
                <ErrorMessage>{errors.postal_code?.message}</ErrorMessage>

                <Button type='submit'>Enviar</Button>
            </form>
        </Container>

  )
}

export default Cadastro

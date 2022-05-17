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

function Atualizar () {
  const { push, location: { state: { customer } } } = useHistory()

  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email('Digite um email válido'),
    cpf: Yup.string(),
    genre: Yup.string(),
    birth: Yup.date().max(new Date()),
    cell_phone: Yup.string(),
    occupation: Yup.string(),
    postal_code: Yup.string(),
    street: Yup.string(),
    number: Yup.string(),
    complement: Yup.string(),
    district: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    country: Yup.string()
  })

  const { register, handleSubmit, formState: { errors }, setValue, setFocus } = useForm({
    resolver: yupResolver(schema)
  })

  const checkCEP = (numberCEP) => {
    const cep = numberCEP.target.value.replace(/\D/g, '')
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res === null ? alert('CEP inválido') : res.json()).then(data => {
      setValue('street', data.logradouro)
      setValue('district', data.bairro)
      setValue('city', data.localidade)
      setValue('state', data.uf)
      setFocus('number')
    })
  }

  const onSubmit = async customerData => {
    try {
      const response = await api.put(`customer/${customer.id}`, {
        name: customerData.name,
        email: customerData.email,
        cpf: validarCPF(customerData.cpf) ? customerData.cpf.replace(/\D/g, '') : toast.error('CPF inválido'),
        genre: customerData.genre,
        birth: customerData.birth,
        cell_phone: customerData.cell_phone.replace(/\D/g, ''),
        occupation: customerData.occupation,
        postal_code: customerData.postal_code.replace(/\D/g, ''),
        street: customerData.street,
        number: customerData.number,
        complement: customerData.complement,
        district: customerData.district,
        city: customerData.city,
        state: customerData.state,
        country: customerData.country
      }, { validateStatus: () => true })

      if (response.status === 201 || response.status === 200) {
        toast.success('Atualização realizada com sucesso')
        setTimeout(() => {
          push('list')
        }, 2000)
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
  }

  return (
        <Container>
            <img src={logoRevect} alt='Logo Revect' />
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Label>Nome</Label>
                <Input placeholder='Ex.: João da Silva' type='text' {...register('name')} defaultValue={customer.name}/>
                <ErrorMessage>{errors.name?.message}</ErrorMessage>

                <Label>Email</Label>
                <Input placeholder='Ex.: seuemail@email.com' type='email' {...register('email')} defaultValue={customer.email}/>
                <ErrorMessage>{errors.email?.message}</ErrorMessage>

                <Label>CPF</Label>
                <Input placeholder='Ex.: 12345678910' type='text' {...register('cpf')} defaultValue={customer.cpf}/>
                <ErrorMessage>{errors.cpf?.message}</ErrorMessage>

                <Label>Gênero</Label>
                <Input placeholder='Ex.: Masculino' type='text' {...register('genre')} defaultValue={customer.genre}/>
                <ErrorMessage>{errors.genre?.message}</ErrorMessage>

                <Label>Data de Nascimento</Label>
                <Input type='date' {...register('birth')} defaultValue={customer.birth} />
                <ErrorMessage>{errors.birth?.message}</ErrorMessage>

                <Label>Número de Celular</Label>
                <Input placeholder='Ex.: +55 (11) 912345678' type='text' {...register('cell_phone')} defaultValue={customer.cell_phone}/>
                <ErrorMessage>{errors.cell_phone?.message}</ErrorMessage>

                <Label>Profissão</Label>
                <Input placeholder='Ex.: Professor' type='text' {...register('occupation')} defaultValue={customer.occupation}/>
                <ErrorMessage>{errors.occupation?.message}</ErrorMessage>

                <Label>Código Postal (CEP)</Label>
                <Input placeholder='Ex.: 01233445' type='number' {...register('postal_code')} nBlur={checkCEP} defaultValue={customer.postal_code}/>
                <ErrorMessage>{errors.postal_code?.message}</ErrorMessage>

                <Label>Avenida / Rua</Label>
                <Input placeholder='Ex.: Avenida 23 de maio' type='text' {...register('street')} defaultValue={customer.street}/>
                <ErrorMessage>{errors.street?.message}</ErrorMessage>

                <Label>Número</Label>
                <Input placeholder='Ex.: 123' type='text' {...register('number')} defaultValue={customer.number}/>
                <ErrorMessage>{errors.number?.message}</ErrorMessage>

                <Label>Complemento</Label>
                <Input placeholder='Ex.: Bloco 1' type='text' {...register('complement')} defaultValue={customer.complement}/>
                <ErrorMessage>{errors.complement?.message}</ErrorMessage>

                <Label>Bairro</Label>
                <Input placeholder='Ex.: Interlagos' type='text' {...register('district')} defaultValue={customer.district}/>
                <ErrorMessage>{errors.district?.message}</ErrorMessage>

                <Label>Cidade</Label>
                <Input placeholder='Ex.: São Paulo' type='text' {...register('city')} defaultValue={customer.city}/>
                <ErrorMessage>{errors.city?.message}</ErrorMessage>

                <Label>Estado</Label>
                <Input placeholder='Ex.: São Paulo' type='text' {...register('state')} defaultValue={customer.state}/>
                <ErrorMessage>{errors.state?.message}</ErrorMessage>

                <Label>País</Label>
                <Input placeholder='Ex.: Brasil' type='text' {...register('country')} defaultValue={customer.country}/>
                <ErrorMessage>{errors.country?.message}</ErrorMessage>

                <Button type='submit'>Entrar</Button>
            </form>
        </Container>

  )
}

export default Atualizar

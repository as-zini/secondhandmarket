'use client'

import Button from '@/components/Button';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ImageUpload from '@/components/ImageUpload';
import Input from '@/components/Input'
// import KaKaoMap from '@/components/KaKaoMap';
import { categories } from '@/components/categories/Categories';
import CategoryInput from '@/components/categories/CategoryInput';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import { Field, FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import KaKaoMap from '../../../components/KaKaoMap';
import { KaKaoMapProps } from '../../../components/KaKaoMap';

const ProductUploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState:{
      errors
    },
    reset} = 
    useForm<FieldValues>({
    defaultValues:{
      title: '',
      descripton: '',
      category: '',
      latitude: 33.5564,
      longitude: 123.523,
      imageSrc: '',
      price: 1
    }
  })


  //watch함수는 (실제로 선언은 안된)defaultvalue의 값을 매개변수로 전달해서 새로운 변수에 할당하면
  //매개변수로 전달한 default value의 값이 바뀔때마다 생성한 새로운 변수도 바뀌게 해줌 
  const imageSrc = watch('imageSrc')
  const category = watch('category');

  const latitude = watch('latitude');
  const longitude = watch('longitude');


  // const KakaoMap = dynamic<KaKaoMapProps>(() =>import('../../../components/KaKaoMap'))
  

  const onSubmit:SubmitHandler<FieldValues> = (data) => {

  }   

  const setCustomValue = (id:string, value:any) => {
    setValue(id, value);
  }

  return (
    <Container>
      <div className='max-w-screen-lg nx-auto'>
      <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
        <Heading
          title="Product Upload" subtitle="upload your product"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        ></ImageUpload>
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register = {register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register = {register}
          errors={errors}
          required
        />
        <hr/>
        <Input
          id="price"
          label="Price"
          formatPrice
          disabled={isLoading}
          register = {register}
          errors={errors}
          required
        />
        <hr/>

        <div className='
        grid
        gird-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto'>
          {categories.map((item) => (
            <div key={item.label} className='col-span-1'>
              <CategoryInput 
              onClick={() => {
                setCustomValue('category', category)
              }}
              selected = {category === item.path}
              label={item.label}
              icon={item.icon}
              path={item.path}></CategoryInput>
            </div>
          ))}
        </div>
        <hr/>
        <KakaoMap setCustomValue={setCustomValue} latitude={latitude} longitude={longitude}/>
        <Button label="상품 생성하기"/>
      </form>
    </div>
    </Container>
    
  )
}

export default ProductUploadPage
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const registerMutation = api.auth.register.useMutation({
    onSuccess: () => {
      router.refresh();
      setForm({
        username: '',
        email: '',
        password: '',
      });
    },
  });

  return (
    <section className='gradient-form h-full bg-neutral-200 dark:bg-neutral-700'>
      <div className='container h-[100vh] p-10'>
        <div className='g-6 relative top-[16%] flex h-full flex-wrap justify-center text-neutral-800 dark:text-neutral-200'>
          <div className='w-full'>
            <div className='block rounded-lg bg-white shadow-lg dark:bg-neutral-800'>
              <div className='g-0 lg:flex lg:flex-wrap'>
                <div className='px-4 md:px-0 lg:w-6/12'>
                  <div className='md:mx-6 md:p-12'>
                    <div className='text-center'>
                      {/*<img*/}
                      {/*  className='mx-auto w-48'*/}
                      {/*  src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp'*/}
                      {/*  alt='logo'*/}
                      {/*/>*/}
                      <h4 className='mb-12 mt-1 pb-1 text-xl font-semibold'>Like Pizza</h4>
                    </div>
                    <form
                      onSubmit={(evt) => {
                        evt.preventDefault();
                        alert({ ...form });
                        registerMutation.mutate({ ...form });
                      }}
                    >
                      <p className='mb-4'>Please login to your account</p>
                      <div className='relative mb-4'>
                        {!form.email.length && (
                          <>
                            <label
                              htmlFor='exampleFormControlInput1'
                              className='peer-focus:text-primary-600 dark:peer-focus:text-primary pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200'
                            >
                              Email address
                            </label>
                          </>
                        )}
                        <input
                          value={form.email}
                          onChange={({ target: { value } }) => {
                            setForm({
                              ...form,
                              email: value,
                            });
                          }}
                          type='text'
                          className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                          id='exampleFormControlInput1'
                          placeholder='email'
                        />
                      </div>
                      <div className='relative mb-4'>
                        {!form.username.length && (
                          <>
                            <label
                              htmlFor='exampleFormControlInput11'
                              className='peer-focus:text-primary-600 dark:peer-focus:text-primary pointer-events-none absolute left-3  mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.2rem] peer-focus:scale-[0.8] peer-data-[te-input-state-active]:-translate-y-[1.1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200'
                            >
                              Your Name
                            </label>
                          </>
                        )}
                        <input
                          onChange={({ target: { value } }) => {
                            setForm({
                              ...form,
                              username: value,
                            });
                          }}
                          value={form.username}
                          type='text'
                          className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                          id='exampleFormControlInput11'
                          placeholder='Password'
                        />
                      </div>
                      <div className='relative mb-4'>
                        <input
                          onChange={({ target: { value } }) => {
                            setForm({
                              ...form,
                              password: value,
                            });
                          }}
                          value={form.password}
                          type='password'
                          className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                          id='exampleFormControlInput11'
                          placeholder='Password'
                        />
                        {!form.password.length && (
                          <>
                            <label
                              htmlFor='exampleFormControlInput11'
                              className='peer-focus:text-primary-600 dark:peer-focus:text-primary pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200'
                            >
                              Password
                            </label>
                          </>
                        )}
                      </div>
                      <div className='mb-12 pb-1 pt-1 text-center'>
                        <button
                          className='mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
                          type='submit'
                          data-te-ripple-color='light'
                          style={{
                            background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                          }}
                        >
                          Log in
                        </button>
                        <a href='#!'>Forgot password?</a>
                      </div>
                      <div className='flex items-center justify-between pb-6'>
                        <p className='mb-0 mr-2'>Don&#39;t have an account?</p>
                        <button
                          type='button'
                          className='border-danger text-danger hover:border-danger-600 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 active:border-danger-700 active:text-danger-700 inline-block rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
                          data-te-ripple-color='light'
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  style={{
                    background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                  }}
                  className='flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none'
                >
                  <div className='px-4 py-6 text-white md:mx-6 md:p-12'>
                    <h4 className='mb-6 text-xl font-semibold'>We are more than just a company</h4>
                    <p className='text-sm'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

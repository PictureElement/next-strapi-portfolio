import React, { useCallback, useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

export const PrevButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="
        flex justify-center items-center
        w-12 h-12
        rounded-full border border-primary-700 text-primary-700
        transition
      hover:bg-primary-700 hover:text-white 
        focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
      active:bg-primary-600 active:text-white
        disabled:opacity-15 disabled:pointer-events-none disabled:cursor-not-allowed
      "
      type="button"
      {...restProps}
    >
      <ArrowLeftIcon className="size-6" />
      {children}
    </button>
  )
}

export const NextButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="
        flex justify-center items-center
        w-12 h-12
        rounded-full border border-primary-700 text-primary-700
        transition
      hover:bg-primary-700 hover:text-white 
        focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
      active:bg-primary-600 active:text-white
        disabled:opacity-15 disabled:pointer-events-none disabled:cursor-not-allowed
      "
      type="button"
      {...restProps}
    >
      <ArrowRightIcon className="size-6" />
      {children}
    </button >
  );
}

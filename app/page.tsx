'use client';

import {Check, ChevronsUpDown} from 'lucide-react';
import {useState} from 'react';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {frameworks} from './data';
import Image from 'next/image';

export default function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const [framework, setFramework] = useState<{
    value: string;
    label: string;
    link: string;
  } | null>(null);

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-3'>
      <Image
        src='/images/nutty.png'
        alt='logo'
        width={100}
        height={100}
        priority
        className='w-auto h-auto'
      />
      <h1 className='text-2xl font-bold my-4'>
        Hãy nhập và chọn điểm bán bạn đang phụ trách.
      </h1>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-[300px] justify-between '
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : 'CHỌN ĐIỂM BÁN'}
            <ChevronsUpDown className='opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[300px] p-0'>
          <Command>
            <CommandInput placeholder='Search framework...' className='h-9' />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                      setFramework(framework);
                    }}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === framework.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <h2 className='font-semibold text-xl '>
        Điểm bán :{' '}
        <span className='text-red-600 font-semibold'> {framework?.label} </span>
      </h2>
      {framework?.link ? (
        <a href={framework?.link} target='_blank' rel='noopener noreferrer'>
          <Button className='cursor-pointer  mt-2 h-10'>
            Đi đến phiếu đặt hàng
          </Button>
        </a>
      ) : null}
    </div>
  );
}

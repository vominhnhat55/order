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

const frameworks = [
  {
    value: 'WMPVT_Winmart Phan Văn Trị',
    label: 'WMPVT_Winmart Phan Văn Trị',
    link: 'https://docs.google.com/spreadsheets/d/1gyJGY202HRQhQFEHgLpldSOwKuEK2o_AFuJmeveKuUc',
  },
  {
    value: 'WMQT_Winmart Quang Trung',
    label: 'WMQT_Winmart Quang Trung',
    link: 'https://docs.google.com/spreadsheets/d/1XNxIVC8NaUMh2SbSE3rrEicoT4IABVJEMxYnGi48U_U',
  },
  {
    value: 'WMPQ_Winmart Phổ Quang',
    label: 'WMPQ_Winmart Phổ Quang',
    link: 'https://docs.google.com/spreadsheets/d/1_OBNiIcX_-8aDzyLpdUqS0LQ0AcwdY1izPKLbyYbb18',
  },
  {
    value: 'WMCH_Winmart Cộng Hoà',
    label: 'WMCH_Winmart Cộng Hoà',
    link: 'https://docs.google.com/spreadsheets/d/1fLcy4UxeT5Medm0t4VepSQD1U1uFsrNlTshslmCamAY',
  },
  {
    value: 'WMNX_Winmart Nguyễn Xí',
    label: 'WMNX_Winmart Nguyễn Xí',
    link: 'https://docs.google.com/spreadsheets/d/13Po5PsGKFCH4r73ZvgPwMrigUbNHq7NxtBQlzOzqZXU',
  },
  {
    value: 'FHD_Finelife Hà Đô',
    label: 'FHD_Finelife Hà Đô',
    link: 'https://docs.google.com/spreadsheets/d/1Frc-Xb7gWOsE8e-SgpqHKDJRDp_Ero_MIETH5s_Sx8c',
  },
  {
    value: 'WMBC_Winmart Bàu Cát',
    label: 'WMBC_Winmart Bàu Cát',
    link: 'https://docs.google.com/spreadsheets/d/1ZVNctAqTJgAUrFXILtgQYmWthhh_hODeAU2IwhnJtqQ',
  },
  {
    value: 'WMDK_Winmart Đồng Khởi',
    label: 'WMDK_Winmart Đồng Khởi',
    link: 'https://docs.google.com/spreadsheets/d/1am9sa9uE6LbqPjivow10toOV0TPelCUUmrkb4x8WAMg',
  },
  {
    value: 'WMMP1_Winmart Mỹ Phước 1',
    label: 'WMMP1_Winmart Mỹ Phước 1',
    link: 'https://docs.google.com/spreadsheets/d/1Ih7zo6Y20JsqiGpQdxzuvRG98Sr2ZdcsR8W_N3kUDZQ',
  },
  {
    value: 'WMTN_Winmart Tây Ninh',
    label: 'WMTN_Winmart Tây Ninh',
    link: 'https://docs.google.com/spreadsheets/d/1wtgA4XMgy9BjOC7NVjJ8KrRZBz0SkpamIdPgyTVzWk0',
  },
  {
    value: 'WMLT_Winmart Long Thành',
    label: 'WMLT_Winmart Long Thành',
    link: 'https://docs.google.com/spreadsheets/d/1jFLJcI02Vprwk5izUi_JPNtIo4QNYvgxOxastKbHXU0',
  },
  {
    value: 'WMBH_Winmart Biên Hoà',
    label: 'WMBH_Winmart Biên Hoà',
    link: 'https://docs.google.com/spreadsheets/d/1UAzpswuKXDugbpdwkgCpmO36BNONN77GApaq3xmdHvo',
  },
  {
    value: 'WMVTG_Winmart Vũng Tàu Gateway',
    label: 'WMVTG_Winmart Vũng Tàu Gateway',
    link: 'https://docs.google.com/spreadsheets/d/1u7LbxRzQhAfpj0Sz7TXVKOMu7Uc0VH8nQfUXEU_F_5g',
  },
  {
    value: 'WMXKC_Winmart Xuân Khánh',
    label: 'WMXKC_Winmart Xuân Khánh',
    link: 'https://docs.google.com/spreadsheets/d/1BXY3rKErGv8HGdwqz8-vZ2QfGKB1rUIZ7i_7XkVV03Y',
  },
  {
    value: 'WMMYT_Winmart Mỹ Tho',
    label: 'WMMYT_Winmart Mỹ Tho',
    link: 'https://docs.google.com/spreadsheets/d/1fgxtnva4Z-ADRaTw46wJX65BuePYBQJifZwVadPZuKI',
  },
  {
    value: 'WMCL_Winmart Cao Lãnh',
    label: 'WMCL_Winmart Cao Lãnh',
    link: 'https://docs.google.com/spreadsheets/d/1L4lNCVbDI3zr0gmGyqKedQn4f-SvnsyV7_sjEeWTqO4',
  },
  {
    value: 'WMNKC_Winmart Ninh Kiều',
    label: 'WMNKC_Winmart Ninh Kiều',
    link: 'https://docs.google.com/spreadsheets/d/12u63m8-q_GVG6dv8i9k7EwnwLL57qhOfHVdozFkOEhc',
  },
  {
    value: 'WMHVC_Winmart Hùng Vương',
    label: 'WMHVC_Winmart Hùng Vương',
    link: 'https://docs.google.com/spreadsheets/d/1blSufsnMRHosptb5Z3fSOYcC0RSu7UBVZrLcQIQQXuM',
  },
  {
    value: 'WMSD_WinMart Sa Đéc',
    label: 'WMSD_WinMart Sa Đéc',
    link: 'https://docs.google.com/spreadsheets/d/1LZdONTBE3-DMIxQPR1pUtOcq3F91S8f4qyBMgO5dl1U',
  },
  {
    value: 'WMTPB_Winmart Trần Phú',
    label: 'WMTPB_Winmart Trần Phú',
    link: 'https://docs.google.com/spreadsheets/d/1YTqa5MJVuR63L2qtflEp1bFvc7Kt725SCgky4zZrytE',
  },
  {
    value: 'WMVIT_Winmart Vị Thanh',
    label: 'WMVIT_Winmart Vị Thanh',
    link: 'https://docs.google.com/spreadsheets/d/18LDkmeaVHolpUUd_4cyUp4UFrNsPRgRNdSR48qBs698',
  },
  {
    value: 'WMCM_Winmart Cà Mau',
    label: 'WMCM_Winmart Cà Mau',
    link: 'https://docs.google.com/spreadsheets/d/1HAKxrFaLaFb_cypfENrA9rbTvbHVqn7LtvHJ4AfDYpU',
  },
  {
    value: 'WMTV_Winmart Trà Vinh',
    label: 'WMTV_Winmart Trà Vinh',
    link: 'https://docs.google.com/spreadsheets/d/1ytmdzHi574Xwg6CbtU3jrXK3GXF4KcmBsptetbDaleU',
  },
  {
    value: 'WMRG_Winmart Rạch Giá',
    label: 'WMRG_Winmart Rạch Giá',
    link: 'https://docs.google.com/spreadsheets/d/1j7PBVpZzE4t6Xexy9r_wcPwPmVlsRiryg_0PRQeCN0g',
  },
  {
    value: 'WMSTR_Winmart Sóc Trăng',
    label: 'WMSTR_Winmart Sóc Trăng',
    link: 'https://docs.google.com/spreadsheets/d/1LyAW9Basp6j7zzwJnQmG1EnsMb8CqzmBM5qVh9SNJN8',
  },
  {
    value: 'WMLX_Winmart Long Xuyên',
    label: 'WMLX_Winmart Long Xuyên',
    link: 'https://docs.google.com/spreadsheets/d/18K0K9u1uhNmKwG92mGzYA6DYdIR0fYgyQRTz8O9FQJg',
  },
  {
    value: 'WMTHB_Winmart Trần Huỳnh',
    label: 'WMTHB_Winmart Trần Huỳnh',
    link: 'https://docs.google.com/spreadsheets/d/1eU0P05O2u_YOP56ZFsKrcI8ooKusOlDnKdSNnciVAFI',
  },
  {
    value: 'WMQNG_Winmart Quảng Ngãi',
    label: 'WMQNG_Winmart Quảng Ngãi',
    link: 'https://docs.google.com/spreadsheets/d/1KjbdizOeDwBy2_CGFcLJl3z31u-rdmb7tDU8Tis6JLA',
  },
  {
    value: 'FPMH_Finelife Phú Mỹ Hưng',
    label: 'FPMH_Finelife Phú Mỹ Hưng',
    link: 'https://docs.google.com/spreadsheets/d/1sLyDQ7kz76zccyFygiVeRJc76DJYmgFnDmIbzPNxAfM',
  },
  {
    value: 'WMLA_Winmart Long An',
    label: 'WMLA_Winmart Long An',
    link: 'https://docs.google.com/spreadsheets/d/1hHZbCsrN9zF-LWir_2XM70czGM0cjaJJETMWxT-XuJ4',
  },
  {
    value: 'WMNL_Winmart Nam Long',
    label: 'WMNL_Winmart Nam Long',
    link: 'https://docs.google.com/spreadsheets/d/1ZjAirppyUw_Q-WWarobpKSOFHpbgHKJhv3ECCz2ePEc',
  },
  {
    value: 'WMTS_Winmart Trung Sơn',
    label: 'WMTS_Winmart Trung Sơn',
    link: 'https://docs.google.com/spreadsheets/d/10-1mqlDvvUg-ypGVFxpZ2IFS_BzzrnFDMprKl2f4CyY',
  },
  {
    value: 'WMHG_Winmart Hưng Gia',
    label: 'WMHG_Winmart Hưng Gia',
    link: 'https://docs.google.com/spreadsheets/d/10r6qlTT7ORDgtdEqnrl--lyrApy5I96mqVD9IsWTQV4',
  },
  {
    value: 'FRP_Finelife Riviera Point',
    label: 'FRP_Finelife Riviera Point',
    link: 'https://docs.google.com/spreadsheets/d/1hYplWTeqdIHPFkPc5uKkjptnsYRPcBT95fo2D0VegGk',
  },
  {
    value: 'WMTDI_Winmart Thảo Điền',
    label: 'WMTDI_Winmart Thảo Điền',
    link: 'https://docs.google.com/spreadsheets/d/1xVSFg1F_bTEPhF7NAnGauWbHAkWFMkVGjmYIyBwd3qQ',
  },
  {
    value: 'WMCDA_Winmart Chợ Dĩ An',
    label: 'WMCDA_Winmart Chợ Dĩ An',
    link: 'https://docs.google.com/spreadsheets/d/1514wpt6rpwjsf5-6jlhCVeTHmNlGSb1zeePtKybkMPw',
  },
  {
    value: 'WMLVV_Winmart Lê Văn Việt',
    label: 'WMLVV_Winmart Lê Văn Việt',
    link: 'https://docs.google.com/spreadsheets/d/1Hn5muUKlF7GkSQNlsPPG2MYvZEOqq3Ly58aIUxyc-78',
  },
  {
    value: 'WMVVN_Winmart Võ Văn Ngân',
    label: 'WMVVN_Winmart Võ Văn Ngân',
    link: 'https://docs.google.com/spreadsheets/d/1utibQCwsYlDVL2jvCv3cC8kCgonaSJmzCtzrMJsyiw0',
  },
  {
    value: 'FLAP_Finelife Lumiere An Phú',
    label: 'FLAP_Finelife Lumiere An Phú',
    link: 'https://docs.google.com/spreadsheets/d/1mHZrRXdHa-jMpyt2hisosznyZLo_-vi78_sDSBZrdI0',
  },
  {
    value: 'WMDAP_Winmart Dĩ An Plaza',
    label: 'WMDAP_Winmart Dĩ An Plaza',
    link: 'https://docs.google.com/spreadsheets/d/1eiUYgG94uNjM-MTJ57ywG6QEu7P5k2A66XRBjCSGnAw',
  },
  {
    value: 'WMNDT_Winmart Nguyễn Duy Trinh',
    label: 'WMNDT_Winmart Nguyễn Duy Trinh',
    link: 'https://docs.google.com/spreadsheets/d/1223XE9fpMOwGTfEhgh2ddvF_ozJCxGiCtUL2nExU9dI',
  },
  {
    value: 'WMBTR_Winmart Bình Trưng',
    label: 'WMBTR_Winmart Bình Trưng',
    link: 'https://docs.google.com/spreadsheets/d/1l7IMqVIgoYDO1pPlkAC9Wfi488_XCE8fAKG_GD4NCpo',
  },
  {
    value: 'WMDM_Winmart Diamond',
    label: 'WMDM_Winmart Diamond',
    link: 'https://docs.google.com/spreadsheets/d/1ZsPA4zB_B8FN4IA6QLbH6v18maYADpdk2br83SCTnow',
  },
  {
    value: 'WML81_Winmart Landmark 81',
    label: 'WML81_Winmart Landmark 81',
    link: 'https://docs.google.com/spreadsheets/d/1blvvR1RSI2Iq9lyVs8yfPNKzJV81KoSPdJwuuKe3rv0',
  },
  {
    value: 'WMTUH_WinMart Tuy Hòa',
    label: 'WMTUH_WinMart Tuy Hòa',
    link: 'https://docs.google.com/spreadsheets/d/10lSdLFLylE7UNyGmyh2ZnNa8wsX-yQdwAX06gMUZQ5o/edit?gid=428576541#gid=428576541',
  },
];

export default function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const [framework, setFramework] = useState<{
    value: string;
    label: string;
    link: string;
  } | null>(null);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
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
      <a href={framework?.link} target='_blank' rel='noopener noreferrer'>
        <Button className='cursor-pointer  mt-2 h-10'>
          {framework?.label ? framework?.label : 'Chọn điểm bán'}
        </Button>
      </a>
    </div>
  );
}

import clsx from 'clsx'

export function InputLabel({
  label,
  required,
}: {
  label: string
  required?: boolean
}) {
  return (
    <div className="mb-2 flex items-center gap-0.5">
      <span className="text-[14px] font-semibold text-gray-600">{label}</span>
      {required && (
        <span className="text-[14px] font-semibold text-[#FF715B]">*</span>
      )}
    </div>
  )
}

export function InputField({
  label,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  required?: boolean
  error?: string
}) {
  return (
    <div className="flex w-full flex-col">
      {label && <InputLabel label={label} required={required} />}
      <input
        className={clsx(
          'h-[49px] w-full rounded-[10px] border px-4 text-[16px] transition-colors outline-none placeholder:text-gray-300',
          props.error
            ? 'border-[#FF715B]'
            : 'border-[#E5E5E5] focus:border-[#FF715B]'
        )}
        {...props}
      />
      {props.error && (
        <span className="mt-1 text-xs text-[#FF715B]">{props.error}</span>
      )}
    </div>
  )
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'flex h-[56px] w-full items-center justify-center rounded-[10px] text-[17px] font-medium transition-colors',
        disabled
          ? 'cursor-not-allowed bg-[#E5E5E5] text-gray-400'
          : 'bg-[#FF715B] text-white hover:opacity-90 active:scale-[0.98]',
        className
      )}
    >
      {children}
    </button>
  )
}

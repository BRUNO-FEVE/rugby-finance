interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  return (
    <p className="w-fit border tracking-wide rounded-lg py-1 px-2 text-muted-foreground hover:text-primary">
      {label}
    </p>
  );
}

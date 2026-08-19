import { useId } from "react";
import CountUp from "react-countup";
import { motion, useReducedMotion } from "framer-motion";

type TextProps = {
  text: string;
  className?: string;
};

export function IrisText({ text, className = "" }: TextProps) {
  const reduceMotion = useReducedMotion();
  let characterOrder = 0;

  if (reduceMotion) return <span className={className}>{text}</span>;

  return (
    <motion.span
      aria-label={text}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.55 }}
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      {text.split(/(\n|\s+)/).map((token, tokenIndex) => {
        if (token === "\n") return <br key={`break-${tokenIndex}`} aria-hidden="true" />;
        if (/^\s+$/.test(token)) return <span key={`space-${tokenIndex}`} aria-hidden="true"> </span>;

        return (
          <span key={`${token}-${tokenIndex}`} className="inline-block" aria-hidden="true">
            {Array.from(token).map((character, characterIndex) => {
              const order = characterOrder++;
              return (
                <motion.span
                  className="inline-block"
                  custom={order}
                  key={`${character}-${characterIndex}`}
                  variants={{
                    hidden: { clipPath: "circle(0% at 50% 50%)", opacity: 0.35 },
                    visible: (letterOrder: number) => ({
                      clipPath: "circle(75% at 50% 50%)",
                      opacity: 1,
                      transition: { duration: 0.42, delay: letterOrder * 0.026, ease: [0.22, 1, 0.36, 1] },
                    }),
                  }}
                >
                  {character}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </motion.span>
  );
}

export function TextGenerateEffect({ text, className = "" }: TextProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <span className={className}>{text}</span>;

  const tokens = text.split(/(\s+)/);

  return (
    <motion.span
      aria-label={text}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
      }}
    >
      {tokens.map((token, index) =>
        /^\s+$/.test(token) ? token : (
          <motion.span
            aria-hidden="true"
            className="inline-block"
            key={`${token}-${index}`}
            variants={{
              hidden: { opacity: 0, filter: "blur(8px)", y: 7 },
              visible: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: { duration: 0.38, ease: "easeOut" },
              },
            }}
          >
            {token}
          </motion.span>
        ),
      )}
    </motion.span>
  );
}

export function ColourfulText({
  text,
  className = "",
  palette = ["#e15f21", "#ff8a45", "#f3b17b", "#ffffff"],
}: TextProps & { palette?: string[] }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <span className={className}>{text}</span>;

  return (
    <span aria-label={text} className={className}>
      {Array.from(text).map((character, index) => (
        <motion.span
          aria-hidden="true"
          className="inline-block"
          key={`${character}-${index}`}
          animate={{ color: palette, y: [0, -2, 0, 0], filter: ["blur(0px)", "blur(0.35px)", "blur(0px)"] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.07,
          }}
        >
          {character === " " ? "\u00a0" : character}
        </motion.span>
      ))}
    </span>
  );
}

export function StatusPulseText({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span>{children}</span>
    </span>
  );
}

export function CountingNumber({
  active,
  end,
  suffix = "",
  duration = 2.4,
}: {
  active: boolean;
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();
  const label = `${end}${suffix}`;

  return (
    <span className="tabular-nums" aria-label={label}>
      {reduceMotion ? label : active ? <CountUp end={end} duration={duration} suffix={suffix} /> : `0${suffix}`}
    </span>
  );
}

export function CurvedLoop({ text, className = "" }: TextProps) {
  const reduceMotion = useReducedMotion();
  const pathId = `curved-loop-${useId().replace(/:/g, "")}`;
  const loopText = `${text}   ${text}   ${text}`;

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 1200 170" className="h-full w-full overflow-visible" role="presentation">
        <defs>
          <path id={pathId} d="M -120 125 Q 600 -5 1320 125" fill="none" />
        </defs>
        <text className="fill-current text-[20px] font-black uppercase tracking-[0.28em]">
          <motion.textPath
            href={`#${pathId}`}
            startOffset="0%"
            animate={reduceMotion ? undefined : { startOffset: ["0%", "-48%"] }}
            transition={reduceMotion ? undefined : { duration: 24, ease: "linear", repeat: Infinity }}
          >
            {loopText}
          </motion.textPath>
        </text>
      </svg>
    </div>
  );
}

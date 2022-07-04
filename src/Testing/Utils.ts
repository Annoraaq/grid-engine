import { Observable, take } from "rxjs";

export function trackEmit(obs?: Observable<any>): () => boolean {
  let hasEmitted = false;
  obs?.pipe(take(1)).subscribe(() => {
    hasEmitted = true;
  });
  return () => hasEmitted;
}

curl "https://nextjs-pokedex-lfmn.vercel.app/api/revalidate" \
  -X POST \
  -H "Content-Type: application/json" \
  -d "[\"/pokemon/1\"]"

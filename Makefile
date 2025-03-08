.PHONY: push degit push2 degit2

push:
	git add -A
	git commit -m "chore: Regular code maintenance"
	git push origin main

push2:
	git push mirror main

degit:
	rm -rf ./.git
	git init
	git remote add origin git@github.com:161043261/chahan.git
	git add -A
	git commit -m "feat: Introduce new feature"
	git push -f origin main --set-upstream

degit2:
	git remote add mirror ssh://git@10.166.33.254/home/git/chahan.git
	git push -f mirror main --set-upstream

